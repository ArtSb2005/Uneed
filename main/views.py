from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView

from main.models import Categories
from main.parser import Pars


class CatalogPageView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super(CatalogPageView, self).get_context_data(**kwargs)
        print(Pars().pars_catalog())
        context['catalog'] = Categories.objects.all()
        return context

    def detail_view(request, id):
        post = get_object_or_404(Categories, id=id)
        return render(request, 'index.html', {
            'post': post
        })