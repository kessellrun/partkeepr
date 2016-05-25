<?php

/* FOSUserBundle:Registration:email.txt.twig */
class __TwigTemplate_b677920a92757ffa9c22b760bbb1fd92cc8d52320b0d1938ac7b5b202da582d7 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'subject' => array($this, 'block_subject'),
            'body_text' => array($this, 'block_body_text'),
            'body_html' => array($this, 'block_body_html'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_7bd6a42db6264db24bbbb8b7bfbad5e958abe12cf65ea94fb7469451499d36bd = $this->env->getExtension("native_profiler");
        $__internal_7bd6a42db6264db24bbbb8b7bfbad5e958abe12cf65ea94fb7469451499d36bd->enter($__internal_7bd6a42db6264db24bbbb8b7bfbad5e958abe12cf65ea94fb7469451499d36bd_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Registration:email.txt.twig"));

        // line 2
        $this->displayBlock('subject', $context, $blocks);
        // line 7
        $this->displayBlock('body_text', $context, $blocks);
        // line 12
        $this->displayBlock('body_html', $context, $blocks);
        
        $__internal_7bd6a42db6264db24bbbb8b7bfbad5e958abe12cf65ea94fb7469451499d36bd->leave($__internal_7bd6a42db6264db24bbbb8b7bfbad5e958abe12cf65ea94fb7469451499d36bd_prof);

    }

    // line 2
    public function block_subject($context, array $blocks = array())
    {
        $__internal_5271ee4c732b6da09ef1c589bd210cc50ce1570a281c15a0f05dc328e23c9bec = $this->env->getExtension("native_profiler");
        $__internal_5271ee4c732b6da09ef1c589bd210cc50ce1570a281c15a0f05dc328e23c9bec->enter($__internal_5271ee4c732b6da09ef1c589bd210cc50ce1570a281c15a0f05dc328e23c9bec_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "subject"));

        // line 4
        echo $this->env->getExtension('translator')->trans("registration.email.subject", array("%username%" => $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array()), "%confirmationUrl%" => (isset($context["confirmationUrl"]) ? $context["confirmationUrl"] : null)), "FOSUserBundle");
        echo "
";
        
        $__internal_5271ee4c732b6da09ef1c589bd210cc50ce1570a281c15a0f05dc328e23c9bec->leave($__internal_5271ee4c732b6da09ef1c589bd210cc50ce1570a281c15a0f05dc328e23c9bec_prof);

    }

    // line 7
    public function block_body_text($context, array $blocks = array())
    {
        $__internal_627e31e4c6be478b8fd3af44a3cef4720a15c7d374c87a00b348f2ec94264c47 = $this->env->getExtension("native_profiler");
        $__internal_627e31e4c6be478b8fd3af44a3cef4720a15c7d374c87a00b348f2ec94264c47->enter($__internal_627e31e4c6be478b8fd3af44a3cef4720a15c7d374c87a00b348f2ec94264c47_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body_text"));

        // line 9
        echo $this->env->getExtension('translator')->trans("registration.email.message", array("%username%" => $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array()), "%confirmationUrl%" => (isset($context["confirmationUrl"]) ? $context["confirmationUrl"] : null)), "FOSUserBundle");
        echo "
";
        
        $__internal_627e31e4c6be478b8fd3af44a3cef4720a15c7d374c87a00b348f2ec94264c47->leave($__internal_627e31e4c6be478b8fd3af44a3cef4720a15c7d374c87a00b348f2ec94264c47_prof);

    }

    // line 12
    public function block_body_html($context, array $blocks = array())
    {
        $__internal_4ab88d98e59c11a950fe5a86335a9f89f4cdcab116cc8bf6a5de4a019d79be63 = $this->env->getExtension("native_profiler");
        $__internal_4ab88d98e59c11a950fe5a86335a9f89f4cdcab116cc8bf6a5de4a019d79be63->enter($__internal_4ab88d98e59c11a950fe5a86335a9f89f4cdcab116cc8bf6a5de4a019d79be63_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body_html"));

        
        $__internal_4ab88d98e59c11a950fe5a86335a9f89f4cdcab116cc8bf6a5de4a019d79be63->leave($__internal_4ab88d98e59c11a950fe5a86335a9f89f4cdcab116cc8bf6a5de4a019d79be63_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Registration:email.txt.twig";
    }

    public function getDebugInfo()
    {
        return array (  66 => 12,  57 => 9,  51 => 7,  42 => 4,  36 => 2,  29 => 12,  27 => 7,  25 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* {% block subject %}*/
/* {% autoescape false %}*/
/* {{ 'registration.email.subject'|trans({'%username%': user.username, '%confirmationUrl%': confirmationUrl}) }}*/
/* {% endautoescape %}*/
/* {% endblock %}*/
/* {% block body_text %}*/
/* {% autoescape false %}*/
/* {{ 'registration.email.message'|trans({'%username%': user.username, '%confirmationUrl%': confirmationUrl}) }}*/
/* {% endautoescape %}*/
/* {% endblock %}*/
/* {% block body_html %}{% endblock %}*/
/* */
