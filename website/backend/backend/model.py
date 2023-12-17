import logging
import os

from ultralytics import YOLO

model = YOLO("../../nn/yolov8_small.pt")
log = logging.getLogger(__name__)


def process_image(path: str):
    model.predict(
        path, save=True, show_labels=True, conf=0.15, project="predict", name="img"
    )
    return os.path.split(path)[-1]
