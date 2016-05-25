<?php

/* FOSUserBundle:Registration:confirmed.html.twig */
class __TwigTemplate_a063cac37bb7666f7aebcb29a4471f5a1c2bc963a4e65ec147ff93880ec173e7 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Registration:confirmed.html.twig", 1);
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
        $__internal_34de76d7741e511a0089be349fefb31cd84873e37eb33871d170c118fabf779d = $this->env->getExtension("native_profiler");
        $__internal_34de76d7741e511a0089be349fefb31cd84873e37eb33871d170c118fabf779d->enter($__internal_34de76d7741e511a0089be349fefb31cd84873e37eb33871d170c118fabf779d_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Registration:confirmed.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_34de76d7741e511a0089be349fefb31cd84873e37eb33871d170c118fabf779d->leave($__internal_34de76d7741e511a0089be349fefb31cd84873e37eb33871d170c118fabf779d_prof);

    }

    // line 5
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_9873229aa62796770342b9b39aa1f9b6f79cde7bb9a0a0a2d769bbbc37ce6908 = $this->env->getExtension("native_profiler");
        $__internal_9873229aa62796770342b9b39aa1f9b6f79cde7bb9a0a0a2d769bbbc37ce6908->enter($__internal_9873229aa62796770342b9b39aa1f9b6f79cde7bb9a0a0a2d769bbbc37ce6908_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 6
        echo "    <p>";
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("registration.confirmed", array("%username%" => $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array())), "FOSUserBundle"), "html", null, true);
        echo "</p>
    ";
        // line 7
        if ((isset($context["targetUrl"]) ? $context["targetUrl"] : null)) {
            // line 8
            echo "    <p><a href=\"";
            echo twig_escape_filter($this->env, (isset($context["targetUrl"]) ? $context["targetUrl"] : null), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("registration.back", array(), "FOSUserBundle"), "html", null, true);
            echo "</a></p>
    ";
        }
        
        $__internal_9873229aa62796770342b9b39aa1f9b6f79cde7bb9a0a0a2d769bbbc37ce6908->leave($__internal_9873229aa62796770342b9b39aa1f9b6f79cde7bb9a0a0a2d769bbbc37ce6908_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Registration:confirmed.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  47 => 8,  45 => 7,  40 => 6,  34 => 5,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* {% block fos_user_content %}*/
/*     <p>{{ 'registration.confirmed'|trans({'%username%': user.username}) }}</p>*/
/*     {% if targetUrl %}*/
/*     <p><a href="{{ targetUrl }}">{{ 'registration.back'|trans }}</a></p>*/
/*     {% endif %}*/
/* {% endblock fos_user_content %}*/
/* */
