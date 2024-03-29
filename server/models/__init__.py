from sqlalchemy import Table, Integer, Column, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from server.app import db

Base = db.Model


class DBTable:
    def populate(self, data, **kwargs):
        for key, val in data.items():
            if hasattr(self, key): setattr(self, key, val)

        for key, val in kwargs.items():
            if hasattr(self, key): setattr(self, key, val)
    
    def serialize(self, fields=None):
        fields = [c.name for c in self.__table__.columns] if fields is None else fields
        return {attr: getattr(self, attr) for attr in fields}


def remove_from_db(objs):
    """Removes objects from database
    
    Arguments:
        objs {List} -- of models
    """
    for obj in objs:
        db.session.delete(obj)
    db.session.commit()

def update_db():
    try:
        db.session.commit()
    except:
        db.session.rollback()

def add_to_db(obj, others=None,rollbackfunc=None):
    """Adds objects to database
    
    Arguments:
        obj {Model} -- Object wanting to add
    
    Keyword Arguments:
        others {List} -- List of other model objects (default: {None})
        rollbackfunc {Func} -- Function that should be called on rollback (default: {None})
    
    Returns:
        Boolean - Success or not successful
    """
    retry = 10
    committed = False
    while (not committed and retry > 0):
        try:
            db.session.add(obj)
            if (others):
                for o in others:
                    db.session.add(o)
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()
            if (rollbackfunc):
                rollbackfunc()
            else:
                retry = 0
            retry -= 1
        else:
            committed = True
    return committed

from server.models.users import Users 
from server.models.projects import Projects 
from server.models.module_templates import Module_Templates
from server.models.courses import Courses