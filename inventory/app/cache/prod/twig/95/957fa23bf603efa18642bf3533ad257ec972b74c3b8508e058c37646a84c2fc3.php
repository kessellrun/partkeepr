<?php

/* FOSUserBundle:Resetting:request.html.twig */
class __TwigTemplate_2d438f0afc86e386ad0298f56cc430fd36d34813e0c76a3c8009f9f185d46c7f extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Resetting:request.html.twig", 1);
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
        $__internal_0ac1643bffe927409fa17853df07f293174db27f21d8ec485e0df7b694109c2e = $this->env->getExtension("native_profiler");
        $__internal_0ac1643bffe927409fa17853df07f293174db27f21d8ec485e0df7b694109c2e->enter($__internal_0ac1643bffe927409fa17853df07f293174db27f21d8ec485e0df7b694109c2e_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Resetting:request.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_0ac1643bffe927409fa17853df07f293174db27f21d8ec485e0df7b694109c2e->leave($__internal_0ac1643bffe927409fa17853df07f293174db27f21d8ec485e0df7b694109c2e_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_2ba84c497ec21f17c1de3c0a2f9d5a28a6f9be1d75622222f079c3c1f4dea9a6 = $this->env->getExtension("native_profiler");
        $__internal_2ba84c497ec21f17c1de3c0a2f9d5a28a6f9be1d75622222f079c3c1f4dea9a6->enter($__internal_2ba84c497ec21f17c1de3c0a2f9d5a28a6f9be1d75622222f079c3c1f4dea9a6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Resetting:request_content.html.twig", "FOSUserBundle:Resetting:request.html.twig", 4)->display($context);
        
        $__internal_2ba84c497ec21f17c1de3c0a2f9d5a28a6f9be1d75622222f079c3c1f4dea9a6->leave($__internal_2ba84c497ec21f17c1de3c0a2f9d5a28a6f9be1d75622222f079c3c1f4dea9a6_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Resetting:request.html.twig";
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
/* {% include "FOSUserBundle:Resetting:request_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
