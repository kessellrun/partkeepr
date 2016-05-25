<?php

/* TwigBundle:Exception:exception.rdf.twig */
class __TwigTemplate_3f06f34e87f5cb6e22b4d4d85a2ef8177e09d18073484a384ffabcdbbfa6630f extends Twig_Template
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
        $__internal_d4bb474baf0f14b5d12fac9f7a0594c148e1da1bd8e5cd47e73337d48cef112e = $this->env->getExtension("native_profiler");
        $__internal_d4bb474baf0f14b5d12fac9f7a0594c148e1da1bd8e5cd47e73337d48cef112e->enter($__internal_d4bb474baf0f14b5d12fac9f7a0594c148e1da1bd8e5cd47e73337d48cef112e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.rdf.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/exception.xml.twig", "TwigBundle:Exception:exception.rdf.twig", 1)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : null))));
        
        $__internal_d4bb474baf0f14b5d12fac9f7a0594c148e1da1bd8e5cd47e73337d48cef112e->leave($__internal_d4bb474baf0f14b5d12fac9f7a0594c148e1da1bd8e5cd47e73337d48cef112e_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.rdf.twig";
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
/* {% include '@Twig/Exception/exception.xml.twig' with { 'exception': exception } %}*/
/* */
