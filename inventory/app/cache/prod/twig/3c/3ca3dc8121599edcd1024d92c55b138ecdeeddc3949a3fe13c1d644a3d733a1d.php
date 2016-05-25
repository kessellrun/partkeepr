<?php

/* FOSUserBundle:Group:show.html.twig */
class __TwigTemplate_46a49613a11ef3e3d83389cf2a1b728f3af09d961f5248381abb15e1360b30d7 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Group:show.html.twig", 1);
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
        $__internal_33b25b5abaf90568394376a62b5e9f302a519bb667e496d1ff6652502222aeec = $this->env->getExtension("native_profiler");
        $__internal_33b25b5abaf90568394376a62b5e9f302a519bb667e496d1ff6652502222aeec->enter($__internal_33b25b5abaf90568394376a62b5e9f302a519bb667e496d1ff6652502222aeec_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Group:show.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_33b25b5abaf90568394376a62b5e9f302a519bb667e496d1ff6652502222aeec->leave($__internal_33b25b5abaf90568394376a62b5e9f302a519bb667e496d1ff6652502222aeec_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_17e0d04d9da55f763f72eae965128e4869e035a27976163e116c2662d885edbe = $this->env->getExtension("native_profiler");
        $__internal_17e0d04d9da55f763f72eae965128e4869e035a27976163e116c2662d885edbe->enter($__internal_17e0d04d9da55f763f72eae965128e4869e035a27976163e116c2662d885edbe_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Group:show_content.html.twig", "FOSUserBundle:Group:show.html.twig", 4)->display($context);
        
        $__internal_17e0d04d9da55f763f72eae965128e4869e035a27976163e116c2662d885edbe->leave($__internal_17e0d04d9da55f763f72eae965128e4869e035a27976163e116c2662d885edbe_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Group:show.html.twig";
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
/* {% include "FOSUserBundle:Group:show_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
