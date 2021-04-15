from sqlalchemy import Table, Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from server.models import Base, DBTable, update_db
import datetime
import secrets
from sqlalchemy.dialects.postgresql import JSONB


class Modules(Base, DBTable):
    __tablename__ = "modules"
    id = Column(Integer, primary_key=True,
                unique=True, autoincrement=True)
    module_id = Column(String, unique=True)
    module_template_id = Column(String, nullable=False)
    name = Column(String)
    body = Column(JSONB)