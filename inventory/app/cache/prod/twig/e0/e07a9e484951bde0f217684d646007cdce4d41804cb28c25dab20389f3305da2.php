<?php

/* PartKeeprSetupBundle::authkey.php.twig */
class __TwigTemplate_24480b2287975f20a80a50712307d9f4dee02c02d56a78ea34759c09aeb9b07a extends Twig_Template
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
        $__internal_42d6055e65feb1656195d536e32611ead7020cbcc7d46dbbdd38d594517f1695 = $this->env->getExtension("native_profiler");
        $__internal_42d6055e65feb1656195d536e32611ead7020cbcc7d46dbbdd38d594517f1695->enter($__internal_42d6055e65feb1656195d536e32611ead7020cbcc7d46dbbdd38d594517f1695_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprSetupBundle::authkey.php.twig"));

        // line 1
        echo "<?php
/**
 * Your auth key is: ";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["authkey"]) ? $context["authkey"] : null), "html", null, true);
        echo "
 *
 * Copy and paste the auth key in order to proceed with setup
 */
";
        
        $__internal_42d6055e65feb1656195d536e32611ead7020cbcc7d46dbbdd38d594517f1695->leave($__internal_42d6055e65feb1656195d536e32611ead7020cbcc7d46dbbdd38d594517f1695_prof);

    }

    public function getTemplateName()
    {
        return "PartKeeprSetupBundle::authkey.php.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  26 => 3,  22 => 1,);
    }
}
/* <?php*/
/* /***/
/*  * Your auth key is: {{ authkey }}*/
/*  **/
/*  * Copy and paste the auth key in order to proceed with setup*/
/*  *//* */
/* */
