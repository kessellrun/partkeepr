<?php

/* TwigBundle:Exception:exception.css.twig */
class __TwigTemplate_12ecae998d2efc538cfa713b29d7c3bfe20fddfdfa68767500cbce778d74570e extends Twig_Template
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
        $__internal_29e13ff36ef7f3a02d0631ce914873859c412cb972c95aadf84f39d692dff97c = $this->env->getExtension("native_profiler");
        $__internal_29e13ff36ef7f3a02d0631ce914873859c412cb972c95aadf84f39d692dff97c->enter($__internal_29e13ff36ef7f3a02d0631ce914873859c412cb972c95aadf84f39d692dff97c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.css.twig"));

        // line 1
        echo "/*
";
        // line 2
        $this->loadTemplate("@Twig/Exception/exception.txt.twig", "TwigBundle:Exception:exception.css.twig", 2)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : null))));
        // line 3
        echo "*/
";
        
        $__internal_29e13ff36ef7f3a02d0631ce914873859c412cb972c95aadf84f39d692dff97c->leave($__internal_29e13ff36ef7f3a02d0631ce914873859c412cb972c95aadf84f39d692dff97c_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.css.twig";
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
