from sqlalchemy import Table, Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from server.models import Base, DBTable, update_db
import datetime
import secrets
from sqlalchemy.dialects.postgresql import JSONB


class Courses(Base, DBTable):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True,
                unique=True, autoincrement=True)
    course_id = Column(String, unique=True)
    name = Column(String, unique=True)
    meta = Column(JSONB)
    module_templates = Column(JSONB)
    template_map = Column(JSONB)