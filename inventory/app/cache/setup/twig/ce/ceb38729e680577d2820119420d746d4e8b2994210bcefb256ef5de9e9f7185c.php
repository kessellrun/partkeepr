<?php

/* PartKeeprSetupBundle::authkey.php.twig */
class __TwigTemplate_1d1ec9b06c61f6e907099757ba541edb383985bfa20e7543897845d9f8ae7848 extends Twig_Template
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
        $__internal_b01ff1d4ffc7e5f947cc8d0cea314d36729cedc96fa0ad27ca4c74e4d5c69b63 = $this->env->getExtension("native_profiler");
        $__internal_b01ff1d4ffc7e5f947cc8d0cea314d36729cedc96fa0ad27ca4c74e4d5c69b63->enter($__internal_b01ff1d4ffc7e5f947cc8d0cea314d36729cedc96fa0ad27ca4c74e4d5c69b63_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "PartKeeprSetupBundle::authkey.php.twig"));

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
        
        $__internal_b01ff1d4ffc7e5f947cc8d0cea314d36729cedc96fa0ad27ca4c74e4d5c69b63->leave($__internal_b01ff1d4ffc7e5f947cc8d0cea314d36729cedc96fa0ad27ca4c74e4d5c69b63_prof);

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
