# Blog

## Index

{% for file in site.static_files %}
  {% if file.path contains '/blog/' %}
    {% assign s = file.path.size | minus: 3 %}
[{{ file.basename | slice: 5, file.basename.size }}]({{ file.path | slice: 0, s}})
  {% endif %}
{% endfor %}
