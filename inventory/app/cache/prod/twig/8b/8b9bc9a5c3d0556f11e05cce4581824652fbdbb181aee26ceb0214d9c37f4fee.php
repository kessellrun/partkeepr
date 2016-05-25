<?php

/* FOSUserBundle:Resetting:reset.html.twig */
class __TwigTemplate_af2594c107b6e660f15fade5e2d58bb58526f5772b00670a366e19113ac8385c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Resetting:reset.html.twig", 1);
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
        $__internal_09389177b2708e8dc3cdafa10338632d0dfb49eef549e157a9efa5b63f6235d0 = $this->env->getExtension("native_profiler");
        $__internal_09389177b2708e8dc3cdafa10338632d0dfb49eef549e157a9efa5b63f6235d0->enter($__internal_09389177b2708e8dc3cdafa10338632d0dfb49eef549e157a9efa5b63f6235d0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Resetting:reset.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_09389177b2708e8dc3cdafa10338632d0dfb49eef549e157a9efa5b63f6235d0->leave($__internal_09389177b2708e8dc3cdafa10338632d0dfb49eef549e157a9efa5b63f6235d0_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_49b87f40ae909607d64d00d50ab70b80b70606e708d4b4a2295c874b73964623 = $this->env->getExtension("native_profiler");
        $__internal_49b87f40ae909607d64d00d50ab70b80b70606e708d4b4a2295c874b73964623->enter($__internal_49b87f40ae909607d64d00d50ab70b80b70606e708d4b4a2295c874b73964623_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Resetting:reset_content.html.twig", "FOSUserBundle:Resetting:reset.html.twig", 4)->display($context);
        
        $__internal_49b87f40ae909607d64d00d50ab70b80b70606e708d4b4a2295c874b73964623->leave($__internal_49b87f40ae909607d64d00d50ab70b80b70606e708d4b4a2295c874b73964623_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Resetting:reset.html.twig";
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
/* {% include "FOSUserBundle:Resetting:reset_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
