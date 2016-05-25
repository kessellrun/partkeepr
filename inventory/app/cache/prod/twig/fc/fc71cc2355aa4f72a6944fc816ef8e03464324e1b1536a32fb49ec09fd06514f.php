<?php

/* TwigBundle:Exception:error.rdf.twig */
class __TwigTemplate_414a3255a5271f7a17398fdead8947478761b5e7de7e2d277b37c4a54e3d919c extends Twig_Template
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
        $__internal_7f570c8faddc9d9dd0630b57a548f2c8bfb77a3ff9ee7eeb441bcf99a288f76b = $this->env->getExtension("native_profiler");
        $__internal_7f570c8faddc9d9dd0630b57a548f2c8bfb77a3ff9ee7eeb441bcf99a288f76b->enter($__internal_7f570c8faddc9d9dd0630b57a548f2c8bfb77a3ff9ee7eeb441bcf99a288f76b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.rdf.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/error.xml.twig", "TwigBundle:Exception:error.rdf.twig", 1)->display($context);
        
        $__internal_7f570c8faddc9d9dd0630b57a548f2c8bfb77a3ff9ee7eeb441bcf99a288f76b->leave($__internal_7f570c8faddc9d9dd0630b57a548f2c8bfb77a3ff9ee7eeb441bcf99a288f76b_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.rdf.twig";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {% include '@Twig/Exception/error.xml.twig' %}*/
/* */
