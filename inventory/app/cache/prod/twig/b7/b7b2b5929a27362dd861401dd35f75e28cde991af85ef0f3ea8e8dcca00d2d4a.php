<?php

/* FOSUserBundle:Profile:show_content.html.twig */
class __TwigTemplate_277821982003a6fe519750c65a27400c7d2bb8f177db825ece98483201850757 extends Twig_Template
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
        $__internal_30ad86cdc25244ac9367fa66911e6d73f6db0a68a884d1742e3398c9b7ed4af6 = $this->env->getExtension("native_profiler");
        $__internal_30ad86cdc25244ac9367fa66911e6d73f6db0a68a884d1742e3398c9b7ed4af6->enter($__internal_30ad86cdc25244ac9367fa66911e6d73f6db0a68a884d1742e3398c9b7ed4af6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Profile:show_content.html.twig"));

        // line 2
        echo "
<div class=\"fos_user_user_show\">
    <p>";
        // line 4
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("profile.show.username", array(), "FOSUserBundle"), "html", null, true);
        echo ": ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array()), "html", null, true);
        echo "</p>
    <p>";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("profile.show.email", array(), "FOSUserBundle"), "html", null, true);
        echo ": ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "email", array()), "html", null, true);
        echo "</p>
</div>
";
        
        $__internal_30ad86cdc25244ac9367fa66911e6d73f6db0a68a884d1742e3398c9b7ed4af6->leave($__internal_30ad86cdc25244ac9367fa66911e6d73f6db0a68a884d1742e3398c9b7ed4af6_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Profile:show_content.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  32 => 5,  26 => 4,  22 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* <div class="fos_user_user_show">*/
/*     <p>{{ 'profile.show.username'|trans }}: {{ user.username }}</p>*/
/*     <p>{{ 'profile.show.email'|trans }}: {{ user.email }}</p>*/
/* </div>*/
/* */
