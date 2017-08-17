from django.contrib import admin

# Register your models here.
from .models import Participant


class ParticipantAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Personal information", {'fields': ['email', 'name', 'institution', 'assistant']}),
        ("Asistance", {'fields': ['assistant', 'participant_hash']}),
        ("Contribution", {'fields': ['contribution', 'title', 'abstract', 'link']}),
        ]
    list_display = ('email', 'name', 'assistant', 'contribution', 'title')
    list_filter = ['assistant', 'contribution']

admin.site.register(Participant, ParticipantAdmin)
