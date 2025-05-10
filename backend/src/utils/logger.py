from logging import getLogger, Formatter, INFO, ERROR, StreamHandler
from logging.handlers import RotatingFileHandler
from os import makedirs
from os.path import exists
from sys import stdout

LOGS_DIR = 'logs'
LOG_FILE = f"{LOGS_DIR}/app.log"
MAX_LOG_SIZE = 10 ** 6
BACKUP_COUNT = 5


def setup():
    l = getLogger("face-analyze-backend")
    l.setLevel(INFO)
    formatter = Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    console_handler = StreamHandler(stdout)
    console_handler.setLevel(INFO)
    console_handler.setFormatter(formatter)
    l.addHandler(console_handler)

    if not exists(LOGS_DIR):
        makedirs(LOGS_DIR)

    file_handler = RotatingFileHandler(LOG_FILE, maxBytes=MAX_LOG_SIZE, backupCount=BACKUP_COUNT)
    file_handler.setLevel(ERROR)
    file_handler.setFormatter(formatter)
    l.addHandler(file_handler)

    return l


logger = setup()
