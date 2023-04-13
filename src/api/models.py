from flask_sqlalchemy import SQLAlchemy
import re

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.email = kwargs['email']
        self.password = kwargs['password']
    
    @classmethod
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        db.session.add(new_user) # INSERT INTO

        try:
            db.session.commit() # Se ejecuta el INSERT INTO
            return new_user
        except Exception as error:
            raise Exception(error.args[0],400)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
            # do not serialize the password, its a security breach
        }

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(50))
    hair_color = db.Column(db.String(50))
    eye_color = db.Column(db.String(50))
    birth_year = db.Column(db.String(50))
    height = db.Column(db.String(50))
    skin_color = db.Column(db.String(50))
    uid = db.Column(db.String(100))

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.gender = kwargs['gender']
        self.hair_color = kwargs['hair_color']
        self.eye_color = kwargs['eye_color']
        self.birth_year = kwargs['birth_year']
        self.height = kwargs['height']
        self.skin_color = kwargs['skin_color']
        self.uid = self.get_uid(kwargs['url']) 
    
    @classmethod
    def create(cls, **kwargs):
        new_character = cls(**kwargs)
        db.session.add(new_character) # INSERT INTO

        try:
            db.session.commit() # Se ejecuta el INSERT INTO
            return new_character
        except Exception as error:
            raise Exception(error.args[0],400)

    def get_uid(self,url):
        s = [str(s) for s in re.findall('\d+', url)]
        return s[0]

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            "birth_year": self.birth_year,
            "height": self.height,
            "skin_color": self.skin_color,
            "uid": self.uid
            # do not serialize the password, its a security breach
        }

class Planet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    population = db.Column(db.String(120))
    terrain = db.Column(db.String(120))
    diameter = db.Column(db.String(100))
    orbital_period = db.Column(db.String(100))
    climate = db.Column(db.String(100))
    uid = db.Column(db.String(100))

    def __init__(self, **kwargs):
        self.name = kwargs['name'],
        self.population = kwargs['population']
        self.terrain = kwargs['terrain']
        self.diameter = kwargs['diameter']
        self.orbital_period = kwargs['orbital_period']
        self.climate = kwargs['climate']
        self.uid = self.get_uid(kwargs['url']) 

    @classmethod
    def create(cls, **kwargs):
        new_planet = cls(**kwargs)
        db.session.add(new_planet) # INSERT INTO

        try:
            db.session.commit() # Se ejecuta el INSERT INTO
            return new_planet
        except Exception as error:
            raise Exception(error.args[0],400)

    def get_uid(self,url):
        s = [str(s) for s in re.findall('\d+', url)]
        return s[0]

    def serialize(self):
        return {
            "id" : self.id, 
            "name" : self.name,
            "population" : self.population,
            "terrain" : self.terrain,
            "diameter": self.diameter,
            "orbital_period": self.orbital_period,
            "climate": self.climate,
            "uid": self.uid
        }

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    model = db.Column(db.String(120))
    passengers = db.Column(db.String(120))
    cost_in_credits = db.Column(db.String(120))
    length = db.Column(db.String(100))
    vehicle_class = db.Column(db.String(100))
    uid = db.Column(db.String(100))
    

    def __init__(self, **kwargs):
        self.name = kwargs['name'],
        self.model = kwargs['model']
        self.passengers = kwargs['passengers']
        self.cost_in_credits = kwargs['cost_in_credits']
        self.length = kwargs['length']
        self.vehicle_class = kwargs['vehicle_class']
        self.uid = self.get_uid(kwargs['url']) 
    
    @classmethod
    def create(cls, **kwargs):
        new_vehicle = cls(**kwargs)
        db.session.add(new_vehicle ) # INSERT INTO

        try:
            db.session.commit() # Se ejecuta el INSERT INTO
            return new_vehicle 
        except Exception as error:
            raise Exception(error.args[0],400)
    
    def get_uid(self,url):
        s = [str(s) for s in re.findall('\d+', url)]
        return s[0]

    def serialize(self):
        return {
            "id" : self.id, 
            "name" : self.name,
            "model" : self.model,
            "passengers" : self.passengers, 
            "cost_in_credits" : self.cost_in_credits,
            "length" : self.length,
            "vehicle_class" : self.vehicle_class,
            "uid" : self.uid
        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    character_id = db.Column(db.Integer, db.ForeignKey("character.id"))
    planet_id = db.Column(db.Integer, db.ForeignKey("planet.id"))
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.id"))

    def __init__(self, **kwargs):
        self.name = kwargs['name'],
        self.user_id = kwargs['user_id']
        self.character_id = kwargs['character_id'] if 'character_id' in kwargs else None
        self.planet_id = kwargs['planet_id'] if 'planet_id' in kwargs else None
        self.vehicle_id = kwargs['vehicle_id'] if 'vehicle_id' in kwargs else None

    @classmethod
    def create_fav(cls,**kwargs):
        new_favorite = cls(**kwargs)
        db.session.add(new_favorite)
        try:
            db.session.commit()
            return new_favorite 
        except Exception as error:
            raise Exception(error.args[0],400)
    
    @classmethod
    def delete_fav(cls, kwargs):
        db.session.delete(kwargs)
        try:
            db.session.commit()
            return {"message": "successfully deleted"}
        except Exception as error:
            raise Exception(error.args[0],400)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "character_id": self.character_id,
            "planet_id": self.planet_id,
            "vehicle_id": self.vehicle_id
        }