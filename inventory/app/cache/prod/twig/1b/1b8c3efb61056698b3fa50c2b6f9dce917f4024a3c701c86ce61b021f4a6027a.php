<?php

/* FOSUserBundle:Resetting:passwordAlreadyRequested.html.twig */
class __TwigTemplate_f696040a1d539543ba8c4844d8ee05e9e7e7ba3bfc24ca72553f901b5741921e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Resetting:passwordAlreadyRequested.html.twig", 1);
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
        $__internal_3835941d2ff7d2632058e6c2e8976414d984cad94af05b04c0f44ffa2ffe366c = $this->env->getExtension("native_profiler");
        $__internal_3835941d2ff7d2632058e6c2e8976414d984cad94af05b04c0f44ffa2ffe366c->enter($__internal_3835941d2ff7d2632058e6c2e8976414d984cad94af05b04c0f44ffa2ffe366c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Resetting:passwordAlreadyRequested.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_3835941d2ff7d2632058e6c2e8976414d984cad94af05b04c0f44ffa2ffe366c->leave($__internal_3835941d2ff7d2632058e6c2e8976414d984cad94af05b04c0f44ffa2ffe366c_prof);

    }

    // line 5
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_5eae4c20de9ef85d45a3d9f4fcad10722f89bb4896b9c71d67cb5b476f3d869f = $this->env->getExtension("native_profiler");
        $__internal_5eae4c20de9ef85d45a3d9f4fcad10722f89bb4896b9c71d67cb5b476f3d869f->enter($__internal_5eae4c20de9ef85d45a3d9f4fcad10722f89bb4896b9c71d67cb5b476f3d869f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 6
        echo "<p>";
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("resetting.password_already_requested", array(), "FOSUserBundle"), "html", null, true);
        echo "</p>
";
        
        $__internal_5eae4c20de9ef85d45a3d9f4fcad10722f89bb4896b9c71d67cb5b476f3d869f->leave($__internal_5eae4c20de9ef85d45a3d9f4fcad10722f89bb4896b9c71d67cb5b476f3d869f_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Resetting:passwordAlreadyRequested.html.twig";
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
/* <p>{{ 'resetting.password_already_requested'|trans }}</p>*/
/* {% endblock fos_user_content %}*/
/* */
