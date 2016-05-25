<?php

/* FOSUserBundle:Registration:register.html.twig */
class __TwigTemplate_2aac20372e2ecb84bbe076f8a724e647b02b0fa78696fb90d8e01e753859a271 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Registration:register.html.twig", 1);
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
        $__internal_418d1648906307286678fba953655d099edfb4ffa178af6dd581ecca30513b2c = $this->env->getExtension("native_profiler");
        $__internal_418d1648906307286678fba953655d099edfb4ffa178af6dd581ecca30513b2c->enter($__internal_418d1648906307286678fba953655d099edfb4ffa178af6dd581ecca30513b2c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Registration:register.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_418d1648906307286678fba953655d099edfb4ffa178af6dd581ecca30513b2c->leave($__internal_418d1648906307286678fba953655d099edfb4ffa178af6dd581ecca30513b2c_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_e0768fac4ce4b41b2fba934bdd7be11bd77561b1985ee508974f59d79f515117 = $this->env->getExtension("native_profiler");
        $__internal_e0768fac4ce4b41b2fba934bdd7be11bd77561b1985ee508974f59d79f515117->enter($__internal_e0768fac4ce4b41b2fba934bdd7be11bd77561b1985ee508974f59d79f515117_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Registration:register_content.html.twig", "FOSUserBundle:Registration:register.html.twig", 4)->display($context);
        
        $__internal_e0768fac4ce4b41b2fba934bdd7be11bd77561b1985ee508974f59d79f515117->leave($__internal_e0768fac4ce4b41b2fba934bdd7be11bd77561b1985ee508974f59d79f515117_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Registration:register.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  40 => 4,  34 => 3,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% block fos_user_content %}*/
/* {% include "FOSUserBundle:Registration:register_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
