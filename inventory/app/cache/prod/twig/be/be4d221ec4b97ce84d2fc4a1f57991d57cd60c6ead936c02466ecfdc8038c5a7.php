<?php

/* FOSUserBundle:Resetting:checkEmail.html.twig */
class __TwigTemplate_e932ec4623fa97fb18093a5452167b265ce324ae0b40c644600fbfebffe5b88b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("FOSUserBundle::layout.html.twig", "FOSUserBundle:Resetting:checkEmail.html.twig", 1);
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
        $__internal_3480a75398f0c080e8743a91227b02e5bb61c7766b709151d01b7dd73e31c869 = $this->env->getExtension("native_profiler");
        $__internal_3480a75398f0c080e8743a91227b02e5bb61c7766b709151d01b7dd73e31c869->enter($__internal_3480a75398f0c080e8743a91227b02e5bb61c7766b709151d01b7dd73e31c869_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Resetting:checkEmail.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_3480a75398f0c080e8743a91227b02e5bb61c7766b709151d01b7dd73e31c869->leave($__internal_3480a75398f0c080e8743a91227b02e5bb61c7766b709151d01b7dd73e31c869_prof);

    }

    // line 5
    public function block_fos_user_content($context, array $blocks = array())
    {
        $__internal_3540b4a231eeccac7f42dc9490546e62e29d8d9abb3d5049218a0efd201715eb = $this->env->getExtension("native_profiler");
        $__internal_3540b4a231eeccac7f42dc9490546e62e29d8d9abb3d5049218a0efd201715eb->enter($__internal_3540b4a231eeccac7f42dc9490546e62e29d8d9abb3d5049218a0efd201715eb_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "fos_user_content"));

        // line 6
        echo "<p>
";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('translator')->trans("resetting.check_email", array("%email%" => (isset($context["email"]) ? $context["email"] : null)), "FOSUserBundle"), "html", null, true);
        echo "
</p>
";
        
        $__internal_3540b4a231eeccac7f42dc9490546e62e29d8d9abb3d5049218a0efd201715eb->leave($__internal_3540b4a231eeccac7f42dc9490546e62e29d8d9abb3d5049218a0efd201715eb_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Resetting:checkEmail.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  43 => 7,  40 => 6,  34 => 5,  11 => 1,);
    }
}
/* {% extends "FOSUserBundle::layout.html.twig" %}*/
/* */
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* */
/* {% block fos_user_content %}*/
/* <p>*/
/* {{ 'resetting.check_email'|trans({'%email%': email}) }}*/
/* </p>*/
/* {% endblock %}*/
/* */
