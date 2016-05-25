<?php

/* PartKeeprFrontendBundle::maintenance.html.twig */
class __TwigTemplate_a8b123183b05938f8de03e2be97be87c9b9e0ff4aabf53957bb57f0186130a8a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_e4686049f91ed4ddd3bc66980b7a5d09ae36bf7c672cd98f2bbe4a0a520a6289 = $this->env->getExtension("native_profiler");
        $__internal_e4686049f91ed4ddd3bc66980b7a5d09ae36bf7c672cd98f2bbe4a0a520a6289->enter($__internal_e4686049f91ed4ddd3bc66980b7a5d09ae36bf7c672cd98f2bbe4a0a520a6289_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprFrontendBundle::maintenance.html.twig"));

        // line 1
        echo "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"
        \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">
<html>
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>
    <title>";
        // line 6
        echo twig_escape_filter($this->env, (isset($context["maintenanceTitle"]) ? $context["maintenanceTitle"] : null), "html", null, true);
        echo "</title>
</head>
<body>
    <h1>";
        // line 9
        echo twig_escape_filter($this->env, (isset($context["maintenanceTitle"]) ? $context["maintenanceTitle"] : null), "html", null, true);
        echo "</h1>

    <p>";
        // line 11
        echo twig_escape_filter($this->env, (isset($context["maintenanceMessage"]) ? $context["maintenanceMessage"] : null), "html", null, true);
        echo "</p>
</body>
</html>
";
        
        $__internal_e4686049f91ed4ddd3bc66980b7a5d09ae36bf7c672cd98f2bbe4a0a520a6289->leave($__internal_e4686049f91ed4ddd3bc66980b7a5d09ae36bf7c672cd98f2bbe4a0a520a6289_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprFrontendBundle::maintenance.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  40 => 11,  35 => 9,  29 => 6,  22 => 1,);
    }
}
/* <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"*/
/*         "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">*/
/* <html>*/
/* <head>*/
/*     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>*/
/*     <title>{{ maintenanceTitle }}</title>*/
/* </head>*/
/* <body>*/
/*     <h1>{{ maintenanceTitle }}</h1>*/
/* */
/*     <p>{{ maintenanceMessage }}</p>*/
/* </body>*/
/* </html>*/
/* */
