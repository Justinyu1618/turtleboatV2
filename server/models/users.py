from sqlalchemy import Table, Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from server.models import Base, DBTable, update_db
import datetime
import secrets
from sqlalchemy.dialects.postgresql import JSONB

association_table = Table('user_project', Base.metadata,
    Column('user_id', String, ForeignKey('users.user_id')),
    Column('project_id', String, ForeignKey('projects.project_id'))
)


class Users(Base, DBTable):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True,
                unique=True, autoincrement=True)
    user_id = Column(String, unique=True)
    email = Column(String, unique=True, primary_key=True)
    mentor = Column(Boolean)
    admin = Column(Boolean)
    personalInfo = Column(JSONB)
    projects = relationship("Projects", secondary=association_table, back_populates="members")

