import logging
import os

from ultralytics import YOLO

model = YOLO("../../nn/yolov8_small.pt")
log = logging.getLogger(__name__)


def process_image(path: str):
    name = os.path.split(path)[-1]
    results = model.predict(
        path, save=True, show_labels=True, conf=0.15, project="predict", name="img"
    )
    if results:
        os.rename(f"{results[0].save_dir}/{name}", f"./predict/{name}")

    return os.path.split(path)[-1]
