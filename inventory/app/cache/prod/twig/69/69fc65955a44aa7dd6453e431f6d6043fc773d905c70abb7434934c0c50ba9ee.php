<?php

/* FOSUserBundle:Resetting:email.txt.twig */
class __TwigTemplate_1ace2b8d687114c640d68b7ec7ef7b3c81449d2e6ecdf5dc46e11def65d3a5ab extends Twig_Template
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
        $__internal_54bcd9580b55f2c230fdf3ccacfc43179d4cc187c0405c357be4d8617cfbf4b0 = $this->env->getExtension("native_profiler");
        $__internal_54bcd9580b55f2c230fdf3ccacfc43179d4cc187c0405c357be4d8617cfbf4b0->enter($__internal_54bcd9580b55f2c230fdf3ccacfc43179d4cc187c0405c357be4d8617cfbf4b0_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "FOSUserBundle:Resetting:email.txt.twig"));

        // line 2
        $this->displayBlock('subject', $context, $blocks);
        // line 7
        $this->displayBlock('body_text', $context, $blocks);
        // line 12
        $this->displayBlock('body_html', $context, $blocks);
        
        $__internal_54bcd9580b55f2c230fdf3ccacfc43179d4cc187c0405c357be4d8617cfbf4b0->leave($__internal_54bcd9580b55f2c230fdf3ccacfc43179d4cc187c0405c357be4d8617cfbf4b0_prof);

    }

    // line 2
    public function block_subject($context, array $blocks = array())
    {
        $__internal_afa84c8fe5df2c16948438bd43db0c8cd92b9273d14c17c256f6d767b2d5963f = $this->env->getExtension("native_profiler");
        $__internal_afa84c8fe5df2c16948438bd43db0c8cd92b9273d14c17c256f6d767b2d5963f->enter($__internal_afa84c8fe5df2c16948438bd43db0c8cd92b9273d14c17c256f6d767b2d5963f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "subject"));

        // line 4
        echo $this->env->getExtension('translator')->trans("resetting.email.subject", array(), "FOSUserBundle");
        echo "
";
        
        $__internal_afa84c8fe5df2c16948438bd43db0c8cd92b9273d14c17c256f6d767b2d5963f->leave($__internal_afa84c8fe5df2c16948438bd43db0c8cd92b9273d14c17c256f6d767b2d5963f_prof);

    }

    // line 7
    public function block_body_text($context, array $blocks = array())
    {
        $__internal_17ff01beff98f939e1993faea75dcca2778b7ca6c0006856c5286e385d3b9f86 = $this->env->getExtension("native_profiler");
        $__internal_17ff01beff98f939e1993faea75dcca2778b7ca6c0006856c5286e385d3b9f86->enter($__internal_17ff01beff98f939e1993faea75dcca2778b7ca6c0006856c5286e385d3b9f86_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body_text"));

        // line 9
        echo $this->env->getExtension('translator')->trans("resetting.email.message", array("%username%" => $this->getAttribute((isset($context["user"]) ? $context["user"] : null), "username", array()), "%confirmationUrl%" => (isset($context["confirmationUrl"]) ? $context["confirmationUrl"] : null)), "FOSUserBundle");
        echo "
";
        
        $__internal_17ff01beff98f939e1993faea75dcca2778b7ca6c0006856c5286e385d3b9f86->leave($__internal_17ff01beff98f939e1993faea75dcca2778b7ca6c0006856c5286e385d3b9f86_prof);

    }

    // line 12
    public function block_body_html($context, array $blocks = array())
    {
        $__internal_126a1289e7cfc4b9b54c9a0ed0ae690fe0acb7ad6b73574b86c9b3a4dfbce2ca = $this->env->getExtension("native_profiler");
        $__internal_126a1289e7cfc4b9b54c9a0ed0ae690fe0acb7ad6b73574b86c9b3a4dfbce2ca->enter($__internal_126a1289e7cfc4b9b54c9a0ed0ae690fe0acb7ad6b73574b86c9b3a4dfbce2ca_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body_html"));

        
        $__internal_126a1289e7cfc4b9b54c9a0ed0ae690fe0acb7ad6b73574b86c9b3a4dfbce2ca->leave($__internal_126a1289e7cfc4b9b54c9a0ed0ae690fe0acb7ad6b73574b86c9b3a4dfbce2ca_prof);

    }

    public function getTemplateName()
    {
        return "FOSUserBundle:Resetting:email.txt.twig";
    }

    public function getDebugInfo()
    {
        return array (  66 => 12,  57 => 9,  51 => 7,  42 => 4,  36 => 2,  29 => 12,  27 => 7,  25 => 2,);
    }
}
/* {% trans_default_domain 'FOSUserBundle' %}*/
/* {% block subject %}*/
/* {% autoescape false %}*/
/* {{ 'resetting.email.subject'|trans }}*/
/* {% endautoescape %}*/
/* {% endblock %}*/
/* {% block body_text %}*/
/* {% autoescape false %}*/
/* {{ 'resetting.email.message'|trans({'%username%': user.username, '%confirmationUrl%': confirmationUrl}) }}*/
/* {% endautoescape %}*/
/* {% endblock %}*/
/* {% block body_html %}{% endblock %}*/
/* */
