# Blog

## Index

{% for file in site.static_files %}
  {% if file.path contains '/blog/' and if file.basename != 'README' %}
    {% assign s = file.path.size | minus: 3 %}
[{{ file.basename }}]({{ file.path | slice: 0, s}})
  {% endif %}
{% endfor %}
