<?php

/* @Framework/Form/textarea_widget.html.php */
class __TwigTemplate_aef14814bd456f76bfc601faa8eb078b91cb39640fcfa252d20fb8c172fed00a extends Twig_Template
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
        $__internal_5fe15cb72c1fd7e6a8a5e80ed06d2e6054decb3646d08afb5fc61c6a089c2e37 = $this->env->getExtension("native_profiler");
        $__internal_5fe15cb72c1fd7e6a8a5e80ed06d2e6054decb3646d08afb5fc61c6a089c2e37->enter($__internal_5fe15cb72c1fd7e6a8a5e80ed06d2e6054decb3646d08afb5fc61c6a089c2e37_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/textarea_widget.html.php"));

        // line 1
        echo "<textarea <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>><?php echo \$view->escape(\$value) ?></textarea>
";
        
        $__internal_5fe15cb72c1fd7e6a8a5e80ed06d2e6054decb3646d08afb5fc61c6a089c2e37->leave($__internal_5fe15cb72c1fd7e6a8a5e80ed06d2e6054decb3646d08afb5fc61c6a089c2e37_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/textarea_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <textarea <?php echo $view['form']->block($form, 'widget_attributes') ?>><?php echo $view->escape($value) ?></textarea>*/
/* */
