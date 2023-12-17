import asyncio
import base64
import csv
import json
import logging
import os
import zipfile
from collections import defaultdict
from typing import AsyncIterable, Optional, cast

import aiofiles
import aiohttp
from aiohttp import BodyPartReader, MultipartReader, web
from aiohttp_session import get_session, new_session, session_middleware
from aiohttp_session.cookie_storage import EncryptedCookieStorage
from cryptography import fernet
from numpy import random

from backend import model

routes = web.RouteTableDef()
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

IMAGES_DIR: str = "images"

queues = defaultdict(asyncio.Queue)


@routes.get("/predict/last")
async def last_predict(request: web.Request) -> web.FileResponse:
    session = await get_session(request)
    if not session.get("predict"):
        session["predict"] = ["./image.png"]

    return web.FileResponse(session["predict"][-1])


@routes.get("/predict/{path}")
async def custom_predict(request: web.Request) -> web.FileResponse:
    path: str = request.match_info["path"]
    return web.FileResponse(f"./predict/{path}")


@routes.post("/predict")
async def upload_images(request: web.Request) -> web.Response:
    """
    Accepts request from `images` HTML form
    Loads all choosed files to `IMAGEX_DIR`
    """
    reader: MultipartReader = await request.multipart()
    paths = _download_files(reader)

    img_path = None
    async for path in paths:
        img_path = model.process_image(path)

    return web.json_response(
        {"url": f"/predict/{img_path}"}, headers={"Access-Control-Allow-Origin": "*"}
    )


async def _download_files(reader: MultipartReader) -> AsyncIterable[str]:
    """
    Downloads files from `reader` and yields
    paths to files
    """

    field: Optional[BodyPartReader | MultipartReader] = await reader.next()

    while field is not None:
        field = cast(aiohttp.BodyPartReader, field)

        form_name = field.name
        if form_name != "images":
            raise web.HTTPBadRequest(text="Form should be named 'images'")

        filename = field.filename
        assert filename is not None

        print(f"Downloading {filename=}")

        base_path, _ = os.path.split(filename)
        os.makedirs(os.path.join(IMAGES_DIR, base_path), exist_ok=True)

        size = 0
        async with aiofiles.open(os.path.join(IMAGES_DIR, filename), "wb") as f:
            while True:
                chunk = await field.read_chunk()  # 8192 bytes by default.
                if not chunk:
                    break
                size += len(chunk)
                await f.write(chunk)

        yield os.path.join(IMAGES_DIR, filename)

        field = await reader.next()


@routes.get("/statitistics")
async def read_statistics(req: web.Request) -> web.Response:
    session = await new_session(req)
    session["id"] = random.randint(0, 100000000)
    session["predict"] = ["./image.png"]
    return web.json_response(
        {
            "total": 6000,
            "detects": [
                {"day": 1, "defects": [12, 7, 7, 11, 10]},
                {"day": 2, "defects": [9, 12, 9, 4, 3]},
                {"day": 3, "defects": [6, 9, 5, 3, 1]},
                {"day": 4, "defects": [2, 2, 4, 2, 6]},
                {"day": 5, "defects": [6, 10, 13, 8, 10]},
                {"day": 6, "defects": [7, 11, 10, 6, 8]},
                {"day": 7, "defects": [3, 9, 6, 6, 7]},
                {"day": 8, "defects": [10, 11, 11, 6, 7]},
                {"day": 9, "defects": [4, 5, 8, 6, 4]},
                {"day": 10, "defects": [7, 10, 7, 2, 9]},
                {"day": 11, "defects": [5, 7, 4, 7, 2]},
                {"day": 12, "defects": [11, 6, 8, 8, 9]},
                {"day": 13, "defects": [6, 2, 4, 3, 6]},
                {"day": 14, "defects": [14, 10, 10, 11, 9]},
                {"day": 15, "defects": [4, 7, 6, 3, 11]},
                {"day": 16, "defects": [6, 5, 5, 4, 4]},
                {"day": 17, "defects": [10, 11, 4, 3, 8]},
                {"day": 18, "defects": [2, 8, 10, 6, 8]},
                {"day": 19, "defects": [6, 11, 5, 7, 9]},
                {"day": 20, "defects": [3, 5, 2, 2, 4]},
                {"day": 21, "defects": [4, 5, 7, 8, 10]},
                {"day": 22, "defects": [13, 9, 10, 19, 6]},
                {"day": 23, "defects": [0, 7, 6, 5, 3]},
                {"day": 24, "defects": [7, 17, 6, 4, 5]},
                {"day": 25, "defects": [4, 7, 8, 10, 11]},
                {"day": 26, "defects": [7, 9, 4, 11, 5]},
                {"day": 27, "defects": [4, 5, 8, 7, 12]},
                {"day": 28, "defects": [5, 3, 2, 6, 1]},
                {"day": 29, "defects": [6, 5, 7, 6, 3]},
                {"day": 30, "defects": [4, 3, 1, 6, 7]},
            ],
        }
    )


def main():
    app = web.Application()

    fernet_key = fernet.Fernet.generate_key()
    secret_key = base64.urlsafe_b64decode(fernet_key)

    app.add_routes(routes)
    app.middlewares.append(session_middleware(EncryptedCookieStorage(secret_key)))

    web.run_app(app)


if __name__ == "__main__":
    main()
