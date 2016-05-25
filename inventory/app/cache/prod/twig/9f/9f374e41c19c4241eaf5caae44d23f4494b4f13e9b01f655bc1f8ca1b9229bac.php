<?php

/* TwigBundle:Exception:exception.atom.twig */
class __TwigTemplate_78521085f2789221dcc7754c05b5a00dd449c88177356d752c794e9b0419010d extends Twig_Template
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
        $__internal_08a0482f9a20e425904220aa270a8754d28714589d35f39f1506d5545738ba59 = $this->env->getExtension("native_profiler");
        $__internal_08a0482f9a20e425904220aa270a8754d28714589d35f39f1506d5545738ba59->enter($__internal_08a0482f9a20e425904220aa270a8754d28714589d35f39f1506d5545738ba59_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.atom.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/exception.xml.twig", "TwigBundle:Exception:exception.atom.twig", 1)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : null))));
        
        $__internal_08a0482f9a20e425904220aa270a8754d28714589d35f39f1506d5545738ba59->leave($__internal_08a0482f9a20e425904220aa270a8754d28714589d35f39f1506d5545738ba59_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.atom.twig";
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
