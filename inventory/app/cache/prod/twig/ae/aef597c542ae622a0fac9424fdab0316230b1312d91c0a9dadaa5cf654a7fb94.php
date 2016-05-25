<?php

/* FOSUserBundle:Registration:checkEmail.html.twig */
class __TwigTemplate_1900dd5e83eef71e3423f5428ad323e328f2ff8ca9ee5696a81e6444424b2520 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Registration:checkEmail.html.twig", 1);
        $this->blocks = array(
            'fos_user_content' => array($this, 'block_fos_user_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "FOSUserBundle::layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_044861b8a9cce1d503a4eb2904b7930775674ddf7dfbc6118d8a0d04b66f672b = $this->env->getExtension("native_profiler");
        $__internal_044861b8a9cce1d503a4eb2904b7930775674ddf7dfbc6118d8a0d04b66f672b->enter($__internal_044861b8a9cce1d503a4eb2904b7930775674ddf7dfbc6118d8a0d04b66f672b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Registration:checkEmail.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_044861b8a9cce1d503a4eb2904b7930775674ddf7dfbc6118d8a0d04b66f672b->leave($__internal_044861b8a9cce1d503a4eb2904b7930775674ddf7dfbc6118d8a0d04b66f672b_prof);

    }

    // line 5
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_6fc9a9dd596821195143176de26453decbf6822ccc41554d4693a570df3be698 = $this->env->getExtension("native_profiler");
        $__internal_6fc9a9dd596821195143176de26453decbf6822ccc41554d4693a570df3be698->enter($__internal_6fc9a9dd596821195143176de26453decbf6822ccc41554d4693a570df3be698_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 6
        echo "    <p>";
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("registration.check_email", array("%email%" => $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "email", array())), "FOSUserBundle"), "html", null, true);
        echo "</p>
";
        
        $__internal_6fc9a9dd596821195143176de26453decbf6822ccc41554d4693a570df3be698->leave($__internal_6fc9a9dd596821195143176de26453decbf6822ccc41554d4693a570df3be698_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Registration:checkEmail.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  40 => 6,  34 => 5,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* {% block fos_user_content %}*/
/*     <p>{{ 'registration.check_email'|trans({'%email%': user.email}) }}</p>*/
/* {% endblock fos_user_content %}*/
/* */
