<?php

/* PartKeeprAuthBundle:Default:index.html.twig */
class __TwigTemplate_0c957ff14c5f186a7082be0df236abb885804057967cdecb2dbeedb2f4197204 extends Twig_Template
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
        $__internal_444eae11a0ce2c8cf6ad9d5aedcd6608e1dc153692c9befee7c1a15d19a761b6 = $this->env->getExtension("native_profiler");
        $__internal_444eae11a0ce2c8cf6ad9d5aedcd6608e1dc153692c9befee7c1a15d19a761b6->enter($__internal_444eae11a0ce2c8cf6ad9d5aedcd6608e1dc153692c9befee7c1a15d19a761b6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprAuthBundle:Default:index.html.twig"));

        // line 1
        echo "Hello ";
        echo twig_escape_filter($this->env, (isset($context["name"]) ? $context["name"] : null), "html", null, true);
        echo "!
";
        
        $__internal_444eae11a0ce2c8cf6ad9d5aedcd6608e1dc153692c9befee7c1a15d19a761b6->leave($__internal_444eae11a0ce2c8cf6ad9d5aedcd6608e1dc153692c9befee7c1a15d19a761b6_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprAuthBundle:Default:index.html.twig";
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
