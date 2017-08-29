from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.utils.text import slugify
from django.conf import settings
import base64
import hashlib
import re
from datetime import datetime

from .models import Participant
from .forms import RegistrationForm

registration_deadline = datetime(2017, 9, 4, 0, 0, 0, 0)

# Create your views here.
def index(request):
    """Main page"""
    participants = Participant.objects.all()
    registration_open = True
    if datetime.now() >= registration_deadline:
        registration_open = False
    registration_open
    context = {"participants": participants, "registration_open": registration_open}
    return render(request, 'index.html', context)

def register(request, participant_id=None):
    """Registration and update page"""
    update = False
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        # Update data
        try: 
            referer = request.META['HTTP_REFERER']
            ids = re.findall("participant/([\w-]+)/$", referer)
            if ids:
                previous_user = get_object_or_404(Participant, participant_hash=ids[0])
                form = RegistrationForm(request.POST, instance=previous_user)
                update = True
            else:
                form = RegistrationForm(request.POST)
        except (Participant.DoesNotExist, IndexError) as error:
            form = RegistrationForm(request.POST)
        if form.is_valid():
            participant = form.save(commit=False)
            new = slugify(participant.email)
            secret = settings.SECRET_KEY
            participant_hash = base64.urlsafe_b64encode(hashlib.md5((new+secret).encode("utf-8")).digest()).decode("utf-8").replace("=","")
            participant.participant_hash = participant_hash
            participant.save()
            return HttpResponseRedirect('/participant/{}/'.format(participant.participant_hash))
    else:
        if participant_id is None:
            form = RegistrationForm()
            update = False
        else:
            participant_init = get_object_or_404(Participant, participant_hash=participant_id)
            form = RegistrationForm(instance=participant_init)
            update = True
    context = {"form": form, "update": update}
    return render(request, 'register.html', context)


def participant_home(request, participant_id):
    """Home page for the participants"""
    participant = get_object_or_404(Participant, participant_hash=participant_id)
    return render(request, 'participant.html', {'participant': participant})
