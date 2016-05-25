<?php

/* TwigBundle:Exception:error.txt.twig */
class __TwigTemplate_8b020dbf42730d24cd76b7dfa7f58b4fc56dc552906273cd90dd7ef78f093cf2 extends Twig_Template
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
        $__internal_d547024dba5460571a83db0c59c014d19af100c124ad6b6ec32760ac459305d2 = $this->env->getExtension("native_profiler");
        $__internal_d547024dba5460571a83db0c59c014d19af100c124ad6b6ec32760ac459305d2->enter($__internal_d547024dba5460571a83db0c59c014d19af100c124ad6b6ec32760ac459305d2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.txt.twig"));

        // line 1
        echo "Oops! An Error Occurred
=======================

The server returned a \"";
        // line 4
        echo (isset($context["status_code"]) ? $context["status_code"] : null);
        echo " ";
        echo (isset($context["status_text"]) ? $context["status_text"] : null);
        echo "\".

Something is broken. Please let us know what you were doing when this error occurred.
We will fix it as soon as possible. Sorry for any inconvenience caused.
";
        
        $__internal_d547024dba5460571a83db0c59c014d19af100c124ad6b6ec32760ac459305d2->leave($__internal_d547024dba5460571a83db0c59c014d19af100c124ad6b6ec32760ac459305d2_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.txt.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 4,  22 => 1,);
    }
}
/* Oops! An Error Occurred*/
/* =======================*/
/* */
/* The server returned a "{{ status_code }} {{ status_text }}".*/
/* */
/* Something is broken. Please let us know what you were doing when this error occurred.*/
/* We will fix it as soon as possible. Sorry for any inconvenience caused.*/
/* */
