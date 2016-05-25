<?php

/* FOSUserBundle:Group:new.html.twig */
class __TwigTemplate_866a355164fbfa782e55a2d9d1ac5b360170812f13dd727b480f64614f14173d extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Group:new.html.twig", 1);
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
        $__internal_cd36d87519c9b29ef14204053b24b98d00638f527828c62cfb44a35bccbecff2 = $this->env->getExtension("native_profiler");
        $__internal_cd36d87519c9b29ef14204053b24b98d00638f527828c62cfb44a35bccbecff2->enter($__internal_cd36d87519c9b29ef14204053b24b98d00638f527828c62cfb44a35bccbecff2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Group:new.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_cd36d87519c9b29ef14204053b24b98d00638f527828c62cfb44a35bccbecff2->leave($__internal_cd36d87519c9b29ef14204053b24b98d00638f527828c62cfb44a35bccbecff2_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_c51f157da7c4456cd5c8f6e786c8eb012e4c4b99befb2bad4abffea7f696d8f7 = $this->env->getExtension("native_profiler");
        $__internal_c51f157da7c4456cd5c8f6e786c8eb012e4c4b99befb2bad4abffea7f696d8f7->enter($__internal_c51f157da7c4456cd5c8f6e786c8eb012e4c4b99befb2bad4abffea7f696d8f7_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Group:new_content.html.twig", "FOSUserBundle:Group:new.html.twig", 4)->display($context);
        
        $__internal_c51f157da7c4456cd5c8f6e786c8eb012e4c4b99befb2bad4abffea7f696d8f7->leave($__internal_c51f157da7c4456cd5c8f6e786c8eb012e4c4b99befb2bad4abffea7f696d8f7_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Group:new.html.twig";
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
/* {% include "FOSUserBundle:Group:new_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
