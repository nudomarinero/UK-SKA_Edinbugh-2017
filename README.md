# UK-SKA Edinbugh-2017

## Installation

Create the virtual environment:
```
virtualenv venv -p python3.6
```

Activate it:
```
source activate venv
```

Install the dependencies:
```
pip install -r requirements.txt
```

Setup the static files, database and admin user:
```
#python manage.py collectstatic # If needed
python manage.py makemigrations conference
python manage.py migrate
python manage.py createsuperuser

```

Run the local development server:
```
python manage.py migrate runserver
```