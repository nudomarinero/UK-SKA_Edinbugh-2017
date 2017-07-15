from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.utils.text import slugify

from .models import Participant
from .forms import RegistrationForm

# Create your views here.
def index(request):
    """Main page"""
    participants = Participant.objects.all()
    context = {"participants": participants}
    return render(request, 'index.html', context)

def register(request):
    """Registration page"""
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            participant = form.save(commit=False)
            new = slugify(participant.email)
            participant.participant_hash = new
            participant.save()
            return HttpResponseRedirect('/participant/{}/'.format(participant.participant_hash))
    else:
        form = RegistrationForm()
    context = {"form": form}
    return render(request, 'register.html', context)


def participant_home(request, participant_id):
    """Home page for the participants"""
    participant = get_object_or_404(Participant, participant_hash=participant_id)
    return render(request, 'participant.html', {'participant': participant})
