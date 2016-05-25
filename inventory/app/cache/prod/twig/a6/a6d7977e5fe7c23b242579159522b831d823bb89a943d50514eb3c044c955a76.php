<?php

/* TwigBundle:Exception:exception.json.twig */
class __TwigTemplate_4b1142d19709ca31c15293995c72832f9727e1f7c454847826c6562e7f5fb5f0 extends Twig_Template
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
        $__internal_e32194f2bed2ff0309f8cf8767e0ce4d0bd1b02ca0e40901c88f64b75e1ef6aa = $this->env->getExtension("native_profiler");
        $__internal_e32194f2bed2ff0309f8cf8767e0ce4d0bd1b02ca0e40901c88f64b75e1ef6aa->enter($__internal_e32194f2bed2ff0309f8cf8767e0ce4d0bd1b02ca0e40901c88f64b75e1ef6aa_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.json.twig"));

        // line 1
        echo twig_jsonencode_filter(array("error" => array("code" => (isset($context["status_code"]) ? $context["status_code"] : null), "message" => (isset($context["status_text"]) ? $context["status_text"] : null), "exception" => $this->getAttribute((isset($context["exception"]) ? $context["exception"] : null), "toarray", array()))));
        echo "
";
        
        $__internal_e32194f2bed2ff0309f8cf8767e0ce4d0bd1b02ca0e40901c88f64b75e1ef6aa->leave($__internal_e32194f2bed2ff0309f8cf8767e0ce4d0bd1b02ca0e40901c88f64b75e1ef6aa_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.json.twig";
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
/* {{ { 'error': { 'code': status_code, 'message': status_text, 'exception': exception.toarray } }|json_encode|raw }}*/
/* */
