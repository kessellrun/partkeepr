<?php

/* PartKeeprFootprintBundle:Default:index.html.twig */
class __TwigTemplate_1c4a263b8654573e03f95794287f3cf8b2e63010ab6686e0c244d3194edc979a extends Twig_Template
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
        $__internal_64f15a3677251c78d292ac70366c324e0eb1c4618ef29c67dcec8a319e046001 = $this->env->getExtension("native_profiler");
        $__internal_64f15a3677251c78d292ac70366c324e0eb1c4618ef29c67dcec8a319e046001->enter($__internal_64f15a3677251c78d292ac70366c324e0eb1c4618ef29c67dcec8a319e046001_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprFootprintBundle:Default:index.html.twig"));

        // line 1
        echo "Hello ";
        echo twig_escape_filter($this->env, (isset($context["name"]) ? $context["name"] : null), "html", null, true);
        echo "!
";
        
        $__internal_64f15a3677251c78d292ac70366c324e0eb1c4618ef29c67dcec8a319e046001->leave($__internal_64f15a3677251c78d292ac70366c324e0eb1c4618ef29c67dcec8a319e046001_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprFootprintBundle:Default:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* Hello {{ name }}!*/
/* */
