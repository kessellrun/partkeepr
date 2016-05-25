<?php

/* TwigBundle:Exception:error.css.twig */
class __TwigTemplate_a26bb00000adc8d655700eaea842778d5feb68b1ea36465b1a1e48f7c86e17b2 extends Twig_Template
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
        $__internal_1366286da153f7b47de82b78776fea52ce15beb9a4e026306762c11a427bd922 = $this->env->getExtension("native_profiler");
        $__internal_1366286da153f7b47de82b78776fea52ce15beb9a4e026306762c11a427bd922->enter($__internal_1366286da153f7b47de82b78776fea52ce15beb9a4e026306762c11a427bd922_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.css.twig"));

        // line 1
        echo "/*
";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : null), "css", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : null), "css", null, true);
        echo "

*/
";
        
        $__internal_1366286da153f7b47de82b78776fea52ce15beb9a4e026306762c11a427bd922->leave($__internal_1366286da153f7b47de82b78776fea52ce15beb9a4e026306762c11a427bd922_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.css.twig";
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
