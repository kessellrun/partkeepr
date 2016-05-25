<?php

/* FOSUserBundle:Group:show_content.html.twig */
class __TwigTemplate_bfc5be1056be5de89ea9539da595fee96d2304a0fb55247f4bd3fcc18453045a extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_68c05a8445646a6a8d8035aba53f507f9ddda134d8a87ea50d05c360028c0fcb = $this->env->getExtension("native_profiler");
        $__internal_68c05a8445646a6a8d8035aba53f507f9ddda134d8a87ea50d05c360028c0fcb->enter($__internal_68c05a8445646a6a8d8035aba53f507f9ddda134d8a87ea50d05c360028c0fcb_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Group:show_content.html.twig"));

        // line 2
        echo "
<div class=\"fos_user_group_show\">
    <p>";
        // line 4
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("group.show.name", array(), "FOSUserBundle"), "html", null, true);
        echo ": ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["group"]) ? $context["group"] : null), "getName", array(), "method"), "html", null, true);
        echo "</p>
</div>
";
        
        $__internal_68c05a8445646a6a8d8035aba53f507f9ddda134d8a87ea50d05c360028c0fcb->leave($__internal_68c05a8445646a6a8d8035aba53f507f9ddda134d8a87ea50d05c360028c0fcb_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Group:show_content.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  26 => 4,  22 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* <div class="fos_user_group_show">*/
/*     <p>{{ 'group.show.name'|trans }}: {{ group.getName() }}</p>*/
/* </div>*/
/* */
