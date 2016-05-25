<?php

/* TwigBundle:Exception:error.js.twig */
class __TwigTemplate_aabe13dd710f403dc72e92900222cc9128fed40481253f049d350c58ee3a0d60 extends Twig_Template
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
        $__internal_497a827233719e1ffce4afe2c57623d51df4bc5a308972d826a77e6b786eaf48 = $this->env->getExtension("native_profiler");
        $__internal_497a827233719e1ffce4afe2c57623d51df4bc5a308972d826a77e6b786eaf48->enter($__internal_497a827233719e1ffce4afe2c57623d51df4bc5a308972d826a77e6b786eaf48_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.js.twig"));

        // line 1
        echo "/*
";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : null), "js", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : null), "js", null, true);
        echo "

*/
";
        
        $__internal_497a827233719e1ffce4afe2c57623d51df4bc5a308972d826a77e6b786eaf48->leave($__internal_497a827233719e1ffce4afe2c57623d51df4bc5a308972d826a77e6b786eaf48_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.js.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {{ status_code }} {{ status_text }}*/
/* */
/* *//* */
/* */
