<?php

/* TwigBundle:Exception:error.xml.twig */
class __TwigTemplate_bc6e9ec88e5ce9093e5bcca106d3155f5284af73b7aca6b642c2d5a65d874f33 extends Twig_Template
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
        $__internal_9caea5c7fc9107fb78a63e622d5b0b88c8224bfdea8f05f52a52fe2a6d6621fa = $this->env->getExtension("native_profiler");
        $__internal_9caea5c7fc9107fb78a63e622d5b0b88c8224bfdea8f05f52a52fe2a6d6621fa->enter($__internal_9caea5c7fc9107fb78a63e622d5b0b88c8224bfdea8f05f52a52fe2a6d6621fa_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.xml.twig"));

        // line 1
        echo "<?xml version=\"1.0\" encoding=\"";
        echo twig_escape_filter($this->env, $this->env->getCharset(), "html", null, true);
        echo "\" ?>

<error code=\"";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : null), "html", null, true);
        echo "\" message=\"";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : null), "html", null, true);
        echo "\" />
";
        
        $__internal_9caea5c7fc9107fb78a63e622d5b0b88c8224bfdea8f05f52a52fe2a6d6621fa->leave($__internal_9caea5c7fc9107fb78a63e622d5b0b88c8224bfdea8f05f52a52fe2a6d6621fa_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.xml.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  28 => 3,  22 => 1,);
    }
}
/* <?xml version="1.0" encoding="{{ _charset }}" ?>*/
/* */
/* <error code="{{ status_code }}" message="{{ status_text }}" />*/
/* */
