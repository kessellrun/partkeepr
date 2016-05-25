<?php

/* FOSUserBundle:Profile:edit.html.twig */
class __TwigTemplate_533411656017fd9c9fba88a627cf787e1f7be4ee50deaa9e7c43870e045780cd extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Profile:edit.html.twig", 1);
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
        $__internal_5fd061ce2ff1cf07786a35384863402d27e3417a7d127fab5f8ed0dc1a7b6d79 = $this->env->getExtension("native_profiler");
        $__internal_5fd061ce2ff1cf07786a35384863402d27e3417a7d127fab5f8ed0dc1a7b6d79->enter($__internal_5fd061ce2ff1cf07786a35384863402d27e3417a7d127fab5f8ed0dc1a7b6d79_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:edit.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_5fd061ce2ff1cf07786a35384863402d27e3417a7d127fab5f8ed0dc1a7b6d79->leave($__internal_5fd061ce2ff1cf07786a35384863402d27e3417a7d127fab5f8ed0dc1a7b6d79_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_a9e736d4bfc88713f7d53f766215f5d14c86f385d6e7b597457a3ef2dc8c88d9 = $this->env->getExtension("native_profiler");
        $__internal_a9e736d4bfc88713f7d53f766215f5d14c86f385d6e7b597457a3ef2dc8c88d9->enter($__internal_a9e736d4bfc88713f7d53f766215f5d14c86f385d6e7b597457a3ef2dc8c88d9_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Profile:edit_content.html.twig", "FOSUserBundle:Profile:edit.html.twig", 4)->display($context);
        
        $__internal_a9e736d4bfc88713f7d53f766215f5d14c86f385d6e7b597457a3ef2dc8c88d9->leave($__internal_a9e736d4bfc88713f7d53f766215f5d14c86f385d6e7b597457a3ef2dc8c88d9_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:edit.html.twig";
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
/* {% include "FOSUserBundle:Profile:edit_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
