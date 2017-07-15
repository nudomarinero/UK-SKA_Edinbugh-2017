from django.db import models

# Create your models here.
class Participant(models.Model):
    email = models.EmailField("E-mail", primary_key=True)
    name = models.CharField("Name", max_length=100)
    institution = models.CharField("Institution", max_length=200)
    assistant = models.BooleanField("Will assist", default=True)
    participant_hash = models.CharField("Participant hash", max_length=200, unique=True)
    contribution = models.BooleanField("Contribution", default=False)
    title = models.CharField("Title", max_length=100, blank=True)
    abstract = models.TextField("Abstract", blank=True)
    link = models.URLField("Contribution link", blank=True)

    def __str__(self):
        return "{} <{}>".format(self.name, self.email)
