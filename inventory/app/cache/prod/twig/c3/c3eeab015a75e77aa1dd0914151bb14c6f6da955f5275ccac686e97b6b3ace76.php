<?php

/* TwigBundle:Exception:exception.js.twig */
class __TwigTemplate_8003bf267872a094a721a6c622e1b1b3e0e7fba3eafccf9dfede2abd98d9c5c8 extends Twig_Template
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
        $__internal_391afb3869fe0508a9395c7b8f158de0f99945769554324fe6d05a2e51ff90fc = $this->env->getExtension("native_profiler");
        $__internal_391afb3869fe0508a9395c7b8f158de0f99945769554324fe6d05a2e51ff90fc->enter($__internal_391afb3869fe0508a9395c7b8f158de0f99945769554324fe6d05a2e51ff90fc_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.js.twig"));

        // line 1
        echo "/*
";
        // line 2
        $this->loadTemplate("@Twig/Exception/exception.txt.twig", "TwigBundle:Exception:exception.js.twig", 2)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : null))));
        // line 3
        echo "*/
";
        
        $__internal_391afb3869fe0508a9395c7b8f158de0f99945769554324fe6d05a2e51ff90fc->leave($__internal_391afb3869fe0508a9395c7b8f158de0f99945769554324fe6d05a2e51ff90fc_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.js.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 3,  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {% include '@Twig/Exception/exception.txt.twig' with { 'exception': exception } %}*/
/* *//* */
/* */
