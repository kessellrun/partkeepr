<?php

/* FOSUserBundle:Group:edit.html.twig */
class __TwigTemplate_58fb57d27a016375c44efd9cdc86e4ade3f1621c9fe4940e15e92e9f9a173fc4 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Group:edit.html.twig", 1);
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
        $__internal_53c5d9e34c5b1abcc411781033dbd3ae622924cb0c735a9c74731660108c1757 = $this->env->getExtension("native_profiler");
        $__internal_53c5d9e34c5b1abcc411781033dbd3ae622924cb0c735a9c74731660108c1757->enter($__internal_53c5d9e34c5b1abcc411781033dbd3ae622924cb0c735a9c74731660108c1757_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Group:edit.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_53c5d9e34c5b1abcc411781033dbd3ae622924cb0c735a9c74731660108c1757->leave($__internal_53c5d9e34c5b1abcc411781033dbd3ae622924cb0c735a9c74731660108c1757_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_b3318abb4147ce57b03b893ea4f896fd81158d7031cb1126b5e4bdf17238dba8 = $this->env->getExtension("native_profiler");
        $__internal_b3318abb4147ce57b03b893ea4f896fd81158d7031cb1126b5e4bdf17238dba8->enter($__internal_b3318abb4147ce57b03b893ea4f896fd81158d7031cb1126b5e4bdf17238dba8_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Group:edit_content.html.twig", "FOSUserBundle:Group:edit.html.twig", 4)->display($context);
        
        $__internal_b3318abb4147ce57b03b893ea4f896fd81158d7031cb1126b5e4bdf17238dba8->leave($__internal_b3318abb4147ce57b03b893ea4f896fd81158d7031cb1126b5e4bdf17238dba8_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Group:edit.html.twig";
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
/* {% include "FOSUserBundle:Group:edit_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
