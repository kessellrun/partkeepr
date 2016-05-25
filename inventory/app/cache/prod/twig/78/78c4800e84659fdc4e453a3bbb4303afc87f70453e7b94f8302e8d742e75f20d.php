<?php

/* FOSUserBundle:Group:list.html.twig */
class __TwigTemplate_00b4f87aaeabfff22c8c3d62ce01f621d8020189012d2550d9396141f51afa1b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Group:list.html.twig", 1);
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
        $__internal_6ad080b2b3f52496466bd4b501dbe85c82e46a7f49410032f0e976c5141f0ca0 = $this->env->getExtension("native_profiler");
        $__internal_6ad080b2b3f52496466bd4b501dbe85c82e46a7f49410032f0e976c5141f0ca0->enter($__internal_6ad080b2b3f52496466bd4b501dbe85c82e46a7f49410032f0e976c5141f0ca0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Group:list.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_6ad080b2b3f52496466bd4b501dbe85c82e46a7f49410032f0e976c5141f0ca0->leave($__internal_6ad080b2b3f52496466bd4b501dbe85c82e46a7f49410032f0e976c5141f0ca0_prof);

    }

    // line 3
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_8430c69876536676ed30ee706d75b0ef8a0f26bf32af5dc794228f3bd6e41bc2 = $this->env->getExtension("native_profiler");
        $__internal_8430c69876536676ed30ee706d75b0ef8a0f26bf32af5dc794228f3bd6e41bc2->enter($__internal_8430c69876536676ed30ee706d75b0ef8a0f26bf32af5dc794228f3bd6e41bc2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 4
        $this->loadTemplate("FOSUserBundle:Group:list_content.html.twig", "FOSUserBundle:Group:list.html.twig", 4)->display($context);
        
        $__internal_8430c69876536676ed30ee706d75b0ef8a0f26bf32af5dc794228f3bd6e41bc2->leave($__internal_8430c69876536676ed30ee706d75b0ef8a0f26bf32af5dc794228f3bd6e41bc2_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Group:list.html.twig";
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
/* {% include "FOSUserBundle:Group:list_content.html.twig" %}*/
/* {% endblock fos_user_content %}*/
/* */
