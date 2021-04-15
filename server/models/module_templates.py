from sqlalchemy import Table, Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from server.models import Base, DBTable, update_db
import datetime
import secrets
from sqlalchemy.dialects.postgresql import JSONB
from uuid import uuid4


class Module_Templates(Base, DBTable):
    __tablename__ = "module_templates"
    id = Column(Integer, primary_key=True,
                unique=True, autoincrement=True)
    module_template_id = Column(String, unique=True)
    name = Column(String)
    body = Column(JSONB)

    def populate(self, data, **kwargs):
        module_template_id = str(uuid4())
        DBTable.populate(self, data, **kwargs)