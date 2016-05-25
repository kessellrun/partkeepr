<?php

/* TwigBundle:Exception:exception_full.html.twig */
class __TwigTemplate_3dc198e72541f0b1ff02af9caebbd51443a1e70fee753a12c3efda1016d2fb14 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@Twig/layout.html.twig", "TwigBundle:Exception:exception_full.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@Twig/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c3875b424be8fc7fd03b9f151038a7202f0d2212579c2e87d8406ccdd69f1b66 = $this->env->getExtension("native_profiler");
        $__internal_c3875b424be8fc7fd03b9f151038a7202f0d2212579c2e87d8406ccdd69f1b66->enter($__internal_c3875b424be8fc7fd03b9f151038a7202f0d2212579c2e87d8406ccdd69f1b66_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception_full.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_c3875b424be8fc7fd03b9f151038a7202f0d2212579c2e87d8406ccdd69f1b66->leave($__internal_c3875b424be8fc7fd03b9f151038a7202f0d2212579c2e87d8406ccdd69f1b66_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_1054b3279b8965b562b924a6f83ac187a2cdf08af15e45431c253d062046cad4 = $this->env->getExtension("native_profiler");
        $__internal_1054b3279b8965b562b924a6f83ac187a2cdf08af15e45431c253d062046cad4->enter($__internal_1054b3279b8965b562b924a6f83ac187a2cdf08af15e45431c253d062046cad4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    <link href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('request')->generateAbsoluteUrl($this->env->getExtension('asset')->getAssetUrl("bundles/framework/css/exception.css")), "html", null, true);
        echo "\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />
";
        
        $__internal_1054b3279b8965b562b924a6f83ac187a2cdf08af15e45431c253d062046cad4->leave($__internal_1054b3279b8965b562b924a6f83ac187a2cdf08af15e45431c253d062046cad4_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_6720cc6bd80f57efe10c8991b7f997a5b9bd7a69ca8957343da2d57a50ea5a02 = $this->env->getExtension("native_profiler");
        $__internal_6720cc6bd80f57efe10c8991b7f997a5b9bd7a69ca8957343da2d57a50ea5a02->enter($__internal_6720cc6bd80f57efe10c8991b7f997a5b9bd7a69ca8957343da2d57a50ea5a02_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        // line 8
        echo "    ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : null), "message", array()), "html", null, true);
        echo " (";
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : null), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : null), "html", null, true);
        echo ")
";
        
        $__internal_6720cc6bd80f57efe10c8991b7f997a5b9bd7a69ca8957343da2d57a50ea5a02->leave($__internal_6720cc6bd80f57efe10c8991b7f997a5b9bd7a69ca8957343da2d57a50ea5a02_prof);

    }

    // line 11
    public function block_body($context, array $blocks = array())
    {
        $__internal_19ac068eb3e94fa7a442d177fb1cd4e301cc60a1ff64e20e794b3197b0300ed6 = $this->env->getExtension("native_profiler");
        $__internal_19ac068eb3e94fa7a442d177fb1cd4e301cc60a1ff64e20e794b3197b0300ed6->enter($__internal_19ac068eb3e94fa7a442d177fb1cd4e301cc60a1ff64e20e794b3197b0300ed6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 12
        echo "    ";
        $this->loadTemplate("@Twig/Exception/exception.html.twig", "TwigBundle:Exception:exception_full.html.twig", 12)->display($context);
        
        $__internal_19ac068eb3e94fa7a442d177fb1cd4e301cc60a1ff64e20e794b3197b0300ed6->leave($__internal_19ac068eb3e94fa7a442d177fb1cd4e301cc60a1ff64e20e794b3197b0300ed6_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception_full.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 12,  72 => 11,  58 => 8,  52 => 7,  42 => 4,  36 => 3,  11 => 1,);
    }
}
/* {% extends '@Twig/layout.html.twig' %}*/
/* */
/* {% block head %}*/
/*     <link href="{{ absolute_url(asset('bundles/framework/css/exception.css')) }}" rel="stylesheet" type="text/css" media="all" />*/
/* {% endblock %}*/
/* */
/* {% block title %}*/
/*     {{ exception.message }} ({{ status_code }} {{ status_text }})*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/*     {% include '@Twig/Exception/exception.html.twig' %}*/
/* {% endblock %}*/
/* */
