from logging import getLogger, Formatter, INFO, ERROR, StreamHandler
from logging.handlers import RotatingFileHandler
from sys import stdout

logger = getLogger("face-analyze-backend")
logger.setLevel(INFO)

formatter = Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

console_handler = StreamHandler(stdout)
console_handler.setLevel(INFO)
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

file_handler = RotatingFileHandler("app.log", maxBytes=10 ** 6, backupCount=5)
file_handler.setLevel(ERROR)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
