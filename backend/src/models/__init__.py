from datetime import datetime

from sqlalchemy import TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base
from .extra import UserRole


class AIResult(Base):
    __tablename__ = 'ai_results'
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    image_id: Mapped[int] = mapped_column(ForeignKey("images.id"))
    metric_name: Mapped[str] = mapped_column()
    metric_value: Mapped[str] = mapped_column()
    analyzed_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))

    image: Mapped["Image"] = relationship("Image", back_populates="ai_results")


class Image(Base):
    __tablename__ = 'images'
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    image: Mapped[str] = mapped_column()

    user: Mapped["User"] = relationship("User", backref="images")
    ai_results = relationship("AIResult", back_populates="image", cascade="all, delete-orphan")


class Log(Base):
    __tablename__ = 'logs'
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    time: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))
    action: Mapped[str] = mapped_column()

    user: Mapped["User"] = relationship("User", backref="logs")


class AdminLog(Base):
    __tablename__ = "admins_logs"
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    admin_id: Mapped[int] = mapped_column(ForeignKey("admins.id"))
    time: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))
    action: Mapped[str] = mapped_column()

    admin: Mapped["User"] = relationship("Admin", backref="admins_logs")


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()
    role: Mapped[str] = mapped_column(default=UserRole.USER.value)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True))


class Admin(Base):
    __tablename__ = "admins"
    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()
    name: Mapped[str] = mapped_column()
    role: Mapped[str] = mapped_column(default=UserRole.ADMIN.value)
