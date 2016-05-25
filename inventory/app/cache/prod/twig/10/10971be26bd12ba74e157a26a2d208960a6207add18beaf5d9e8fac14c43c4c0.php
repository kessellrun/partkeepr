<?php

/* FOSUserBundle:Profile:show.html.twig */
class __TwigTemplate_f2da4036dcc124119a2ba78a02037e37546583f7ef4ffec4e4c266b12cbd541e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Profile:show.html.twig", 1);
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
        $__internal_a0c390ac96150effee4690ac4bcf6a78eb483d4fd670d85504fa5cfd235dc16d = $this->env->getExtension("native_profiler");
        $__internal_a0c390ac96150effee4690ac4bcf6a78eb483d4fd670d85504fa5cfd235dc16d->enter($__internal_a0c390ac96150effee4690ac4bcf6a78eb483d4fd670d85504fa5cfd235dc16d_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:show.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_a0c390ac96150effee4690ac4bcf6a78eb483d4fd670d85504fa5cfd235dc16d->leave($__internal_a0c390ac96150effee4690ac4bcf6a78eb483d4fd670d85504fa5cfd235dc16d_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_9f7a38694f6058f04d54670746bba6088b99843389682b87fbaf9412400d0541 = $this->env->getExtension("native_profiler");
        $__internal_9f7a38694f6058f04d54670746bba6088b99843389682b87fbaf9412400d0541->enter($__internal_9f7a38694f6058f04d54670746bba6088b99843389682b87fbaf9412400d0541_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Profile:show_content.html.twig", "FOSUserBundle:Profile:show.html.twig", 4)->display($context);
        
        $__internal_9f7a38694f6058f04d54670746bba6088b99843389682b87fbaf9412400d0541->leave($__internal_9f7a38694f6058f04d54670746bba6088b99843389682b87fbaf9412400d0541_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:show.html.twig";
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
/* {% include "FOSUserBundle:Profile:show_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
