<?php

/* TwigBundle:Exception:error.atom.twig */
class __TwigTemplate_f1f83bfc0e3fdfd92ad9510d36785dabf2f51f520bb7fa7a7bcd5ed22471e2d0 extends Twig_Template
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
        $__internal_1a9da568a1394dbd2a8285beed0c886268ec9b323b9728c80023632b2fe50dc7 = $this->env->getExtension("native_profiler");
        $__internal_1a9da568a1394dbd2a8285beed0c886268ec9b323b9728c80023632b2fe50dc7->enter($__internal_1a9da568a1394dbd2a8285beed0c886268ec9b323b9728c80023632b2fe50dc7_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.atom.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/error.xml.twig", "TwigBundle:Exception:error.atom.twig", 1)->display($context);
        
        $__internal_1a9da568a1394dbd2a8285beed0c886268ec9b323b9728c80023632b2fe50dc7->leave($__internal_1a9da568a1394dbd2a8285beed0c886268ec9b323b9728c80023632b2fe50dc7_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.atom.twig";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {% include '@Twig/Exception/error.xml.twig' %}*/
/* */
